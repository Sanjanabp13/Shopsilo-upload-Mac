function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 33060;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 33060 > /dev/null;
done;

for child in $(list_child_processes 33073);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/sanjanabiminiprakashbabu/Desktop/hexawarefolder/Hexaware-201 csharp codes/ShopSiloApp-main/ShopSiloAppFSD/ShopSiloAppFSD.Server/bin/Debug/net8.0/728f2a984ae74b07981c223e7e72aecf.sh;