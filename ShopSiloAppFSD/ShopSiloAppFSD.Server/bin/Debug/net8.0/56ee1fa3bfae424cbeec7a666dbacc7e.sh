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

ps 30758;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 30758 > /dev/null;
done;

for child in $(list_child_processes 30785);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/sanjanabiminiprakashbabu/Desktop/hexawarefolder/Hexaware-201 csharp codes/ShopSiloApp-main/ShopSiloAppFSD/ShopSiloAppFSD.Server/bin/Debug/net8.0/56ee1fa3bfae424cbeec7a666dbacc7e.sh;
