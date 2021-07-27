# bibliophile
A swipe-based book recommendation app.

## Quickstart

### Bring up vagrant
Initialise Ubuntu 20.04 virtual machine, connect to virtual machine, and switch to development environment. The virtual machine is configured to automatically forward the VM-side port `80` to host-side port `8080`.

```
vagrant up
vagrant ssh
cd /vagrant
```

Dependencies such as `nodejs`, `npm`, and `nginx` are automatically installed when the Vagrant virtual machine was provisioned with `vagrant up`. The provisioning script as well as VM parameters is available in the repository's `Vagrantfile`.

### Install dependencies
Install dependencies for `nodejs`.

```
yarn install
```

Import test database into mysql.

```
sudo mysql -u root
create database bibliophile;
quit;
sudo mysql -u root bibliophile < bibliophile.sql
```

Change default MySQL authentication method for `root` user. Newer versions of MySQL do not work out-of-the-box with default configuration. We must alter the authentication method for the `root` user in the following manner:

```
sudo mysql -u root
use mysql;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
flush privileges;
exit;
```

### Run developmental server
Now run the developmental server

```
cd /vagrant
nodejs main.js
```

On the host machine browser, the service can now be accessed via `127.0.0.1:3000`
