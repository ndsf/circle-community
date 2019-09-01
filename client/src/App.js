import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

import MenuBar from "./components/MenuBar";

import Home from "./pages/Home";
import Homepage from "./pages/Homepage";
import Books from "./pages/books/Books";
import Movies from "./pages/movies/Movies";
import Groups from "./pages/groups/Groups";

import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import ChangePassword from "./pages/users/ChangePassword";
import ResetPassword from "./pages/users/ResetPassword";

import Post from "./pages/Post";
import Movie from "./pages/movies/Movie";
import Book from "./pages/books/Book";
import Group from "./pages/groups/Group";

import GroupPost from "./pages/groups/GroupPost";
import GroupApply from "./pages/groups/GroupApply";

import Search from "./pages/Search";
import SearchPost from "./pages/SearchPost";
import SearchMovie from "./pages/movies/SearchMovie";
import SearchBook from "./pages/books/SearchBook";
import SearchGroup from "./pages/groups/SearchGroup";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <MenuBar />
          <Route exact path="/" component={Homepage} />
          <Route exact path="/users/" component={Home} />
          <Route exact path="/users/:username" component={Home} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/groups" component={Groups} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/posts/:postId" component={Post} />
          <Route exact path="/movies/:movieId" component={Movie} />
          <Route exact path="/books/:bookId" component={Book} />
          <Route exact path="/groups/:groupId" component={Group} />
          <Route exact path="/search/all/:keyword" component={Search} />
          <Route exact path="/search/posts/:keyword" component={SearchPost} />
          <Route exact path="/search/movies/:keyword" component={SearchMovie} />
          <Route exact path="/search/books/:keyword" component={SearchBook} />
          <Route exact path="/search/groups/:keyword" component={SearchGroup} />
          <Route
            exact
            path="/groups/:groupId/posts/:postId"
            component={GroupPost}
          />
          <Route exact path="/groups/:groupId/applies" component={GroupApply} />
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
