import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Form,
  Layout,
  Breadcrumb,
  Input,
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Comment,
  List,
  Skeleton
} from "antd";
import moment from "moment";
import GroupGrantAdminButton from "../../components/group/GroupGrantAdminButton";
import GroupDeleteReportButton from "../../components/group/GroupDeleteReportButton";
import GroupInformationCard from "../../components/group/GroupInformationCard";
import GroupAdminCard from "../../components/group/GroupAdminCard";
import { AuthContext } from "../../context/auth";
const { TextArea } = Input;
const { Content, Footer } = Layout;

const GroupApply = props => {
  const groupId = props.match.params.groupId;

  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const {
    data: { getGroup }
  } = useQuery(FETCH_GROUP_APPLY_QUERY, {
    variables: {
      groupId
    }
  });

  const [applyGroupAdmin] = useMutation(APPLY_GROUP_ADMIN_MUTATION, {
    update: () => {
      setTitle("");
      setComment("");
    },
    variables: {
      groupId: groupId,
      title: title,
      body: comment
    }
  });

  const deleteGroupCallback = () => {
    props.history.push("/groups");
  };

  let postMarkup;

  if (!getGroup) {
    postMarkup = <Skeleton />;
  } else {
    const {
      id,
      username,
      posts,
      applies,
      applyCount,
      admins,
      likes
    } = getGroup;

    const isAdmin =
      user &&
      (admins.find(admin => admin.username === user.username) ||
        username === user.username);

    postMarkup = (
      <Layout className="layout">
        <Content style={{ padding: "0 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/groups">小组</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/groups/${id}`}>{getGroup.body}</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`/groups/${id}/applies`}>管理</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <Row gutter={24}>
              <Col lg={17} md={24}>
                {/* 发表评论 */}
                {user &&
                  !admins.find(admin => admin.username === user.username) &&
                  user.username !== username &&
                  (applies.find(apply => apply.username === user.username) &&
                  likes.find(like => like.username === user.username) ? (
                    <Card
                      title="发表申请"
                      bordered={false}
                      style={{ marginBottom: "24px" }}
                    >
                      <Button onClick={applyGroupAdmin}>撤销申请</Button>
                    </Card>
                  ) : (
                    <Card
                      title="发表申请"
                      bordered={false}
                      style={{ marginBottom: "24px" }}
                    >
                      <Form>
                        <Form.Item>
                          <TextArea
                            type="text"
                            placeholder="需要加入小组才能进行发表，内容不能为空。"
                            name="comment"
                            value={comment}
                            onChange={event => setComment(event.target.value)}
                            ref={commentInputRef}
                            autosize={{ minRows: 4, maxRows: 100 }}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="submit"
                            disabled={comment.trim() === ""}
                            onClick={applyGroupAdmin}
                          >
                            发表申请
                          </Button>
                        </Form.Item>
                      </Form>
                    </Card>
                  ))}
                {/* 申请列表 */}
                <Card
                  title={`申请(${applyCount})`}
                  bordered={false}
                  style={{ marginBottom: "24px" }}
                >
                  <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={applies}
                    renderItem={item => (
                      <li key={item.id}>
                        <Comment
                          actions={
                            user && user.username === username
                              ? [
                                  <GroupGrantAdminButton
                                    groupId={groupId}
                                    name={item.username}
                                  />
                                ]
                              : []
                          }
                          author={item.username}
                          avatar={
                            <Link to={`/users/${username}`}>
                              <Avatar
                                style={{
                                  color: "#f56a00",
                                  backgroundColor: "#fde3cf"
                                }}
                              >
                                {item.username}
                              </Avatar>
                            </Link>
                          }
                          content={item.body}
                          datetime={moment(item.createdAt).fromNow()}
                        />
                      </li>
                    )}
                  />
                </Card>
                {/* 举报列表 */}
                <Card
                  title={`举报`}
                  bordered={false}
                  style={{ marginBottom: "24px" }}
                >
                  <List
                    className="comment-list"
                    itemLayout="horizontal"
                    dataSource={posts}
                    renderItem={post => (
                      <div key={post.id}>
                        {post.reports.map(item => (
                          <Comment
                            key={item.id}
                            actions={
                              isAdmin
                                ? [
                                    <GroupDeleteReportButton
                                      groupId={groupId}
                                      postId={post.id}
                                      reportId={item.id}
                                    />
                                  ]
                                : []
                            }
                            author={item.username}
                            avatar={
                              <Link to={`/users/${username}`}>
                                <Avatar
                                  style={{
                                    color: "#f56a00",
                                    backgroundColor: "#fde3cf"
                                  }}
                                >
                                  {item.username}
                                </Avatar>
                              </Link>
                            }
                            content={
                              <span>
                                {`举报了 ${post.username} 发布的 `}
                                <Link to={`/groups/${id}/posts/${post.id}`}>
                                  {post.title}
                                </Link>
                              </span>
                            }
                            datetime={moment(item.createdAt).fromNow()}
                          />
                        ))}
                      </div>
                    )}
                  />
                </Card>
              </Col>
              <Col lg={7} md={24}>
                <GroupInformationCard
                  group={getGroup}
                  deleteGroupCallback={deleteGroupCallback}
                />
                <GroupAdminCard group={getGroup} />
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Awesome Douban Created by ndsf
        </Footer>
      </Layout>
    );
  }

  return postMarkup;
};

const APPLY_GROUP_ADMIN_MUTATION = gql`
  mutation($groupId: ID!, $title: String!, $body: String!) {
    applyGroupAdmin(groupId: $groupId, title: $title, body: $body) {
      id
      applies {
        id
        title
        body
        createdAt
        username
      }
      applyCount
    }
  }
`;

const FETCH_GROUP_APPLY_QUERY = gql`
  query getGroup($groupId: ID!) {
    getGroup(groupId: $groupId) {
      id
      body
      createdAt
      username
      bio
      avatar
      admins {
        createdAt
        username
      }
      applies {
        title
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      posts {
        id
        title
        body
        createdAt
        username
        commentCount
        top
        qualified
        likes {
          id
          username
          createdAt
        }
        reports {
          id
          username
          createdAt
        }
        likeCount
        reportCount
      }
      applyCount
    }
  }
`;

export default GroupApply;
