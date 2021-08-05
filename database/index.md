数据库是一种专门管理数据的软件
可以处理大量的数据
有统一的程序读写接口，比如SQL
可以通过统一的语法处理关联查询的统计

目前最常用的数据库就是关系型数据库，比如mysql oracle sqlserver

表、字段、记录

1.show databases; 查询数据库总览
2.create database test character set utf8 collate utf8_general_ci; 创建一个名为test的库，编码类型为utf-8
3.use test使用test库
4.CREATE TABLE IF NOT EXISTS TBL_RESULT(
  id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  score INT UNSIGNED NOT NULL,
  PRIMARY KEY (id)
);创建TBL_RESULT表
5.show tables;查询表总览
6.desc TBL_RESULT;查看表TBL_RESULT详情
7.ALERT TABLE TBL_RESULT MODIFY COLUMN score INT(20) unsigned;修改表score字段的长度
8.INSERT INTO TBL_RESULT (name, score) VALUES ('李玉龙', 20); 插入一条数据
9.UPDATE TBL_RESULT SET score=80 WHERE name='李玉龙';更新name='李玉龙'的score值
10.DELETE FROM TBL_RESULT WHERE name='李玉龙';
11.SELECT * FROM TBL_RESULT;
12.SELECT name,score
  FROM TBL_RESULT
  WHERE score> 80
  ORDER BY score DESC; 查询分数大于80的数据，倒序排序
13.SELECT name, AVG(score)
    FROM TBL_RESULT
    GROUP BY name; 以名字为分组，查询分数平均值
14.select a.name, a.score, b.position
    from TBL_RESULT a
    left join TBL_POSITION b
    on a.name=b.name;连表查询，左连
  


SQL 是结构化查询语言的缩写，用来访问和操作数据库系统。
功能：
1.数据定义：创建表、删除表、修改表
2.数据操作：数据添加、修改数据、删除数据
3.数据查询：条件筛选、统计聚合、关联查询

