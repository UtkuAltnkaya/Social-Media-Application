<h1>Social Media Application</h1>
<p>It is a social media application backend which uses microservices architecture.</p>

<details>
  <summary>Contents</summary>
  <ul>
    <li><a href="#services">Services</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#note">Note</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ul>
</details>

<h2>Services</h2>
<p>
The services except the Follow service are written in Javascript, Follow service is written in Go. The Authentication and User service uses MongoDB, and other services use PostgreSQL. For the event bus, RabbitMQ was used, and Express-Gateway for API-Gateway.
</p>

<ul>
  <li><a href="https://github.com/UtkuAltnkaya/Social-Media-Application/tree/main/services/auth">Authentication</a></li>
  <li><a href="https://github.com/UtkuAltnkaya/Social-Media-Application/tree/main/services/user">User</a></li>
  <li><a href="https://github.com/UtkuAltnkaya/Social-Media-Application/tree/main/services/post">Post</a></li>
  <li><a href="https://github.com/UtkuAltnkaya/Social-Media-Application/tree/main/services/comment">Comment</a></li>
  <li><a href="https://github.com/UtkuAltnkaya/Social-Media-Application/tree/main/services/follow">Follow</a></li>
</ul>

<h2>Endpoints</h2>

<ul>
  <h3>Authentication</h3>
  <ul>
    <li>
      <div>POST - Register User</div>
      <div>http://localhost:8080/auth/register</div>
    </li>
    <li>
      <div>POST - Login User</div>
      <div>http://localhost:8080/auth/login</div>
    </li>
    <li>
      <div>POST - Logout User</div>
      <div>http://localhost:8080/auth/logout</div>
    </li>
  </ul>
  <h3>User</h3>
    <ul>
      <li>
        <div>GET - Get user by ID</div>
        <div>http://localhost:8080/user/get_id?user_id=&ltuser_id&gt</div>
      </li> 
      <li>
        <div>GET - Get user by username </div>
        <div>http://localhost:8080/user/get_username?user_id=&ltuser_name&gt</div>
      </li>
      <li>
        <div>GET - Get all user posts</div>
        <div>http://localhost:8080/user/get_posts?user_id=&ltuser_id&gt</div>
      </li>
      <li>
        <div>GET - Get all user comments</div>
        <div>http://localhost:8080/user/get_comments?user_id=&ltuser_id&gt</div>
      </li>
      <li>
        <div>POST - Follow user</div>
        <div>http://localhost:8080/user/follow?user_id=&ltuser_id&gt</div>
      </li>
      <li>
        <div>POST - Unfollow user</d>
        <div>http://localhost:8080/user/unfollow?user_id=&ltuser_id&gt</div>
      </li>
      <li>
        <div>GET - Get user's all followers</d>
        <div>http://localhost:8080/user/get_all_followers?user_id=&ltuser_id&gt</div>
      </li>
      <li>
        <div>GET - Get user follows</d>
        <div>http://localhost:8080/user/is_follows?user_id=&ltuser_id&gt</div>
      </li>
    </ul>

  <h3>Posts</h3>
    <ul>
      <li>
        <div>POST - Create post</d>
        <div>http://localhost:8080/posts/create</div>
      </li>
      <li>
        <div>GET - Get post by ID</d>
        <div>http://localhost:8080/posts/get_post?post_id=&ltpost_id&gt</div>
      </li>
      <li>
        <div>GET - Get post's all comments</d>
        <div>http://localhost:8080/posts/get_comments?post_id=&ltpost_id&gt</div>
      </li>
      <li>
        <div>GET - Get post's one comment</d>
        <div>http://localhost:8080/posts/get_one_comment?post_id=&ltpost_id&gt&comment_id=&ltcomment_id&gt</div>
      </li>
      <li>
        <div>DELETE - Delete post</d>
        <div>http://localhost:8080/posts/delete_post?post_id=&ltpost_id</div>
      </li>
    </ul>
  <h3>Comment</h3>
    <ul>
      <li>
        <div>POST - Create Comment</d>
        <div>http://localhost:8080/comment/create?post_id=&ltpost_id&gt</div>
      </li>
      <li>
        <div>DELETE - Delete Comment</d>
        <div>http://localhost:8080/comment/delete?comment_id=&ltcomment_id&gt</div>
      </li>
    </ul>
  </li>
</ul>

<h2>Note</h2>

The connection strings and passwords are not included in .env and docker-compose file.

<h2>License</h2>

Distributed under the MIT License. See `LICENSE` for more information.

<h2>Acknowledgments</h2>

<ul>
  <li><a href="https://expressjs.com">Express</a></li>
  <li><a href="https://www.express-gateway.io">Express-Gateway</a></li>
  <li><a href="https://www.mongodb.com">MongoDB</a></li>
  <li><a href="https://www.postgresql.org">PostgreSQL</a></li>
  <li><a href="https://www.rabbitmq.com/">RabbitMQ</a></li>
</ul>
