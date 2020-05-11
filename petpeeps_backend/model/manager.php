<?php
class Manager {
    protected $_db;

    CONST HOST = "127.0.0.1";
    CONST DBNAME = "dogpeeps";
    CONST LOGIN = "root";
    CONST PWD = "";
    
    // constructor
    function __construct() {
        $host = self::HOST;
        $dbname = self::DBNAME;
        $this->_db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", self::LOGIN, self::PWD);
    }
}
