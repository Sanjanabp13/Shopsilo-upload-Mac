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

ps 74214;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 74214 > /dev/null;
done;

for child in $(list_child_processes 74225);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/sanjanabiminiprakashbabu/Desktop/hexawarefolder/Hexaware-201 csharp codes/ShopSiloApp-main/ShopSiloAppFSD/ShopSiloAppFSD.Server/bin/Debug/net8.0/c9c203c30d3e4be7825bd7c888c1bbaa.sh;
