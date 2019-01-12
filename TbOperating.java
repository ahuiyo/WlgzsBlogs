package org.wlgzs.website.wlgzsblog.entity;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.Transient;
import java.io.Serializable;


/*
* pid 1，代表关注；2, 代表对于博客的点赞；3, 代表评论；4, 代表用户个人的设置;5, 代表通知消息6，代表对于评论的喜欢,7代表收藏,8代表我的粉丝
* 这个类是为了处理评论，关注，消息，点赞，收藏，把评论的对象设为博主host的，都是主评论
* */
@TableName("tb_operating")
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class TbOperating implements Serializable {

    @TableId(value="id",type=IdType.AUTO)
    private Integer id;

    @TableField("user_id")
    private Integer userId;

    @TableField("user_name")
    private String userName;

    // 这个是你关注的那个用户的id
    @TableField("object_id")
    private Integer objectId;

    // 这个是你关注那个对象的用户名
    @TableField("object_name")
    private String objectName;

    // 这个是内容
    private String content;

    // 这个是具体的时间日期
    @TableField("create_time")
    private String createTime;

    // 这个是一篇博客的id，
    @TableField("bl_id")
    private Integer blId;

    // 这个代表着个人的github地址
    @TableField("is_attention")
    private String isAttention;

    // 评论区的点赞量
    private Integer likes;
    // 评论区的评论量
    private Integer comments;

    // 这个是父id，来标识这条记录是储存什么的，1，代表关注；2，代表喜欢；3，代表评论；4代表用户个人的设置
    private Integer pid;

    // 这个是用户博客头像
    private String images;

    // 这个是用户关注的模块
    private String module;

    /*这是【表情】个父id，对于主评论来说，这个id为空，对于，子评论来说这个id，代表着主评论的id，
    对于喜欢来说，这个喜欢对应着一个评论的id，评论和喜欢是一对多的*/
    @TableField("op_id")
    private Integer opId;

    // 对于评论区喜欢来说，这个是主评论的id
    @TableField("objcomments_id")
    private Integer objcommentsId;


    public TbOperating(Integer userId,String userName, String images, Integer pid, String module) {
        this.userId = userId;
        this.userName = userName;
        this.images = images;
        this.pid = pid;
        this.module = module;
    }


    public TbOperating(Integer userId, Integer objectId, String objectName, String content, String createTime, Integer blId, String images, Integer pid) {
        this.userId = userId;
        this.objectId = objectId;
        // 注意了这个对象，在不同的场景下是不同的
        this.objectName = objectName;
        this.content = content;
        this.createTime = createTime;
        this.blId = blId;
        this.images = images;
        this.pid = pid;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public Integer getObjectId() {
        return objectId;
    }

    public void setObjectId(Integer objectId) {
        this.objectId = objectId;
    }

    public String getObjectName() {
        return objectName;
    }

    public void setObjectName(String objectName) {
        this.objectName = objectName == null ? null : objectName.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime == null ? null : createTime.trim();
    }

    public Integer getBlId() {
        return blId;
    }

    public void setBlId(Integer blId) {
        this.blId = blId;
    }

    public String getIsAttention() {
        return isAttention;
    }

    public void setIsAttention(String isAttention) {
        this.isAttention = isAttention == null ? null : isAttention.trim();
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

    public Integer getComments() {
        return comments;
    }

    public void setComments(Integer comments) {
        this.comments = comments;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images == null ? null : images.trim();
    }

    public String getModule() {
        return module;
    }

    public void setModule(String module) {
        this.module = module == null ? null : module.trim();
    }

    public void setOpId(Integer opId) {
        this.opId = opId;
    }

    public Integer getOpId() {
        return opId;
    }

    public void setObjcommentsId(Integer objcommentsId) {
        this.objcommentsId = objcommentsId;
    }

    public Integer getObjcommentsId() {
        return objcommentsId;
    }

}