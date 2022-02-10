
docker: Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock: Post http://%2Fvar%2Frun%2Fdocker.sock/v1.26/containers/create: dial unix /var/run/docker.sock: connect: permission denied. See 'docker run --help'.



表示目前的使用者身分沒有權限去存取docker engine, 因為docker的服務基本上都是以root的身分在執行的, 所以在指令前加sudo就能成功執行指令

但每次實行docker指令(就連docker ps)都還要加sudo實在有點麻煩,



正確的解法是

我們可以把目前使用者加到docker群組裡面, 當docker service 起來時, 會以這個群組的成員來初始化相關服務
```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```
需要退出重新登錄後才會生效



Workaround
因為問題是出在權限不足, 如果以上方法都不管用的話, 可以手動修改權限來解決這個問題

```bash
sudo chmod 777 /var/run/docker.sock
```


https://docs.docker.com/install/linux/linux-postinstall/


```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

```bash
enter psql container
```


```bash
docker exec -it <postgres_name> bash
```

```bash
su postgres
```


```bash
psql
```