<?php
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
class Posts {
    private $db;
    
    public function __construct($database) {
	    $this->db = $database;
	}
        
    public function savePost($email, $course, $description){
        if($description == ""){
            return false;
        }
        else{
            $querys = $this->db->prepare("SELECT * FROM users WHERE emailID=:id");
            $querys->bindValue(':id', $email);
            $querys->execute();
            $user = $querys->fetch();
            $querys->closeCursor();
            $userid = $user['userID'];
            
            $query = $this->db->prepare("INSERT INTO posts (userID, course, description, status, datePosted) "
                . "VALUES(:userID, :course, :description, :status, :datePosted)");
            $query->bindValue(':userID', $userid);
            $query->bindValue(':course', $course);
            $query->bindValue(':description', $description);
            $query->bindValue(':status', 'Active');
            $query->bindValue(':datePosted', date('c'));
            $query->execute();
            return true;
        }
    }
    
    public function getPosts($course){
            $querys = $this->db->prepare("SELECT p.*,u.* FROM posts p JOIN users u ON p.userID=u.userID WHERE p.course = :course");
            $querys->bindValue(':course', $course);
            $querys->execute();
            return $querys->fetchAll();
    }
    
    public function getCourse(){
            $querys = $this->db->prepare("SELECT DISTINCT(course) FROM posts");
            $querys->execute();
            return $querys->fetchAll();
    }
    
    public function getSelectedPost($postid){
            $querys = $this->db->prepare("SELECT p.*,u.* FROM posts p JOIN users u ON p.userID=u.userID WHERE p.postID = :postid");
            $querys->bindValue(':postid', $postid);
            $querys->execute();
            return $querys->fetchAll();
    }
    public function getReplies($postid){
            $querys = $this->db->prepare("SELECT r.*,u.* FROM replies r JOIN users u ON r.userID=u.userID WHERE r.postID = :postid");
            $querys->bindValue(':postid', $postid);
            $querys->execute();
            return $querys->fetchAll();
    }
    public function saveReply($uid, $postid, $content){
        if($content == ""){
            return false;
        }
        else{
            $query = $this->db->prepare("INSERT INTO replies (userID, postID, content, status, dateReplied) "
                . "VALUES(:userID, :postID, :content, :status, :dateReplied)");
            $query->bindValue(':userID', $uid);
            $query->bindValue(':postID', $postid);
            $query->bindValue(':content', $content);
            $query->bindValue(':status', 'Active');
            $query->bindValue(':dateReplied', date('c'));
            $query->execute();
            return true;
        }
    }
}