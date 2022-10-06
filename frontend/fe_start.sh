#!/bin/bash

PROC_NAME=node
ProcNumber=`ps -ef |grep -w $PROC_NAME|grep -v grep|wc -l`
if [ $ProcNumber -le 0 ];then
   echo "node is not run"
   nohup /root/node-v16.17.1-linux-x64//bin/serve /root/dist -l tcp://localhost:9000 >/dev/null 2>&1 &
   echo "restart success!!"

else
   echo "node is running..."
fi

# */1 * * * * /root/publish/fe_start.sh >> /root/publish/restart.log 2>&1