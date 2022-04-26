# 课程成绩预发布系统

- Page 登录

  - 页面信息

    - 无

  - Input：

    - 输入框：用户名
    - 输入框：密码

  - Link：

    - 点击注册按钮：to page 注册
    - 点击登录按钮：Login()

  - ```
    Post: Login(), json: {"user_id", "password"}
    			return: {"result", "user_info"}
    			Success: to page 学生主页/教师主页/教务员主页 by user_info.type
    ```

- Page 学生主页

  - 页面信息

    - 该学生的课程列表，每个课程的状态（未出成绩/未确认/已确认/Review中）

  - Link：

    - 点击成绩详情：to page 成绩确认
    - 点击登出：to page 登录
    - 点击修改密码：to page 修改密码

  - ```
    // 初始化
    Get: GetGrades(), json: {"user_id", "type"}
    		 return: {"result", "grades_info"}
    // 点击成绩详情
    {"grade_id"}
    // 点击修改密码
    {"user_id", "type"}
    ```

- Page 修改密码：

  - 页面信息

    - 前端自行确认原密码

  - Input：

    - 输入框：新密码

  - Link：

    - 点击确认修改：to page 主页
    - 点击返回：to page 主页

  - ```
    // 初始化
    Get: GetUserInfo(), json: {"user_id", "type"}
    		 return: {"user_info"}
    // 修改密码
    Post: UpdateUserInfo(), json: {"user_id", "type", "password"}
    			return: {"result", "User"}
    			Success: to page 主页
    ```

- Page 成绩确认

  - 页面信息

    - 成绩单信息，学号/总评/平时/期中/期末，下方确认选项
    - 如果该成绩单处于Review中，额外显示状态（待处理/已处理）和处理意见（若有）

  - Input：

    - 选项按钮：有无异议
    - 文本框：异议描述
    - 上传图片

  - Link：

    - 点击无异议：提示信息，刷新页面
    - 点击有异议：提示信息，刷新页面
    - 点击返回：to page 学生主页

  - ```
    // 初始化
    Get: GetGradeInfo(), json: {"grade_id"}
    		 return: {"result", "grade_info", "grade_review_info"}
    // 点击无异议 or 有异议
    Post: UpdateGradeInfo(), json: {"grade_id", "grade_info"}
    			return: {"result"}
    			Success: GetGradeInfo()
    // Review状态下点击无异议
    Put: UpdateGradeReview(), json: {"grade_review_id"}
    		 return: {"result"}
    		 Success: GetGradeInfo()
    // 点击有异议
    Post: AddGradeReviewLog(), json: {"grade_id", "ojection_info"}
    			return: {"result"}
    			Success: GetGradeInfo()
    ```

- Page 教师主页

  - 页面信息

    - 该教师的课程列表，每个课程的状态（未发布成绩/已发布成绩）
    - 未发布成绩的课程有发布成绩按钮
    - 已发布成绩的课程有成绩单详情按钮

  - Link：

    - 点击发布成绩：to page 发布成绩
    - 点击查看成绩单：to page 成绩单详情
    - 点击登出：to page 登录
    - 点击修改密码：to page 修改密码

  - ```
    // 初始化
    Get: GetCourses(), json: {"user_id", "type"}
    		 return: {"result", "courses_info"}
    // 点击发布成绩 or 查看成绩单
    {"course_id"}
    // 点击修改密码
    {"user_id", "type"}
    ```

- Page 发布成绩

  - 页面信息

    - 该课程的学生列表，右侧输入框输入成绩（总评/平时/期中/期末）

  - Input：

    - 输入框：成绩

  - Link：

    - 点击提交：to page 查看成绩单（成功）or 刷新页面（失败）
    - 点击返回：to page 教师主页

  - ```
    // 初始化
    Get: GetCourseInfo(), json: {"course_id"}
    		 return: {"result", "course_info", "students_info"}
    // 点击提交
    Post: UpdateGrades(), json: {"course_id", "grades_info"}
    			return: {"result"}
    			Success: to page 查看成绩单
    			Fail: GetCourseInfo()
    ```

- Page 查看成绩单

  - 页面信息

    - 该课程的学生列表，每个学生的状态（未确认/已确认/有异议）
    - 有异议的学生有处理异议按钮

  - Link：

    - 点击查看异议：to page 处理异议
    - 点击返回：to page 教师主页

  - ```
    // 初始化
    Get: GetGradesInfo(), json: {"course_id"}
    		 return: {"result", "grades_info"}
    ```

- Page 处理异议

  - 页面信息

    - 异议信息，下方输入处理意见

  - Input：

    - 文本框：处理意见

  - Link：

    - 点击确认处理：刷新页面
    - 点击返回：to page 查看成绩单

  - ```
    // 初始化
    Get: GetGradeReviewInfo(), json: {"grade_id"}
    		 return: {"result", "grade_review_info"}
    // 确认处理
    Post: UpdateGradeReviewInfo(), json: {"grade_review_id", "grade_review_info"}
    			return: {"result"}
    			Success: GetGradeReviewInfo()
    // 更新成绩单信息为未处理
    Post: UpdateGradeInfo(), json: {"grade_id"}
    			return: {"result"}
    ```

- Page 教务员主页

  - 页面信息：

    - 所有课程列表

  - Link：

    - 点击注册账号：to page 注册
    - 点击创建课程：to page 创建课程

  - ```
    // 初始化
    Get: GetAllCourses(), json: {}
    		 return: {"courses_info"}
    // 创建账号 or 创建课程
    {"user_id", "type"}
    ```

- Page 注册账号

  - 页面信息

    - 无

  - Input：

    - 账号类型按钮：教师/学生
    - 用户信息
    - 可提交文件一键导入

  - Link：

    - 点击确认注册：to page 主页

  - ```
    Post: Register(), json: {"file", "user_info"}
    			return: {"result"}
    			Success: to page 主页
    ```

- Page 创建课程

  - 页面信息

    - 无

  - Input：

    - 课程信息

  - Link：

    - 点击提交：to page 主页

  - ```
    Post: AddCourse(), json: {"course_info"}
    			return: {"result"}
    			Success: to page 主页
    ```

    