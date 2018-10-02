docker-compose up -d  >> docker.log &
python3.6 autodeploy.py &
while :
do
  ultrahook github 5000 >> ultrahook.log 
done

