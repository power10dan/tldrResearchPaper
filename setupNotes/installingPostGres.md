# Installing on Linux
Specifically Arch Linux because it's what I'm using, most of this should be
similar for Mac OSX. If you're on windows then you're on your own and why do you
hate yourself?

# Install for your OS
On my system this is simply

```
sudo pacman -S postgresql
```

On Mac this is

```
brew install postgresql
```

If you don't have brew installed then what are you even doing? Just run this and
then run the above command for mac.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

# Post Installation

After you install we need to switch the postgres user called ```postgres```. On 
mac or linux you can run this only if you are a sudoer (you can run admin stuff)

```
sudo -u postgres -i
```

If not then run this

```
su
su -l postgres
```

After that is done your prompt should look like:
Where Voltron is your computer's name or hostname if you're on linux

```
[postgres@Voltron ~]$ 
```

Now we must initialize the database cluster by running the following

```
[postgres@Voltron ~]$ initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data'
```

You may want to make sure your LANG environment variable is set with

```
echo $LANG
```

Here is what mine returned: `en_US.UTF-8`

if it was successful it should look like this:

    The files belonging to this database system will be owned by user "postgres".
    This user must also own the server process.
 
    The database cluster will be initialized with locale "en_US.UTF-8".
    The default text search configuration will be set to "english".
    
    Data page checksums are disabled.
    
    fixing permissions on existing directory /var/lib/postgres/data ... ok
    creating subdirectories ... ok
    selecting default max_connections ... 100
    selecting default shared_buffers ... 128MB
    selecting dynamic shared memory implementation ... posix
    creating configuration files ... ok
    running bootstrap script ... ok
    performing post-bootstrap initialization ... ok
    syncing data to disk ... ok
    
    WARNING: enabling "trust" authentication for local connections
    You can change this by editing pg_hba.conf or using the option -A, or
    --auth-local and --auth-host, the next time you run initdb.
    
    Success. You can now start the database server using:
    
    pg_ctl -D /var/lib/postgres/data -l logfile start

Now exit the `su` from the postgres user like this: 

```
[postgres@Voltron ~]$ exit
logout
```
# Simple Commands
See ref 3 for a cheatsheet

## Login
I've created user names for all of you, here is a list of them:

    Role name |                         Attributes                         | Member of 
    -----------|------------------------------------------------------------|-----------
     Dan       | Superuser, Create role, Create DB                          | {}
     Jeff      | Superuser, Create role, Create DB                          | {}
     Mihai     | Superuser, Create role, Create DB                          | {}
     Ra        | Superuser, Create role, Create DB                          | {}
     Spencer   | Superuser, Create role, Create DB                          | {}
     postgres  | Superuser, Create role, Create DB, Replication, Bypass RLS | {}


To login you need to run this command:

```
psql -d mydb -U myuser
```

The Db is named `tldrDb` so if I were Rahul I would do this from a shell
```
psql -d tldrDb -U Ra
```

# Other Commands
You can see other commands by typing `help`. Nothing complicated. See the sql 
directory in src/ for some examples. I'll add them as I go.

# Importing and Exporting
See ref 2 for more info. There is a bunch of things we can do here.

## Exporting
We need to synchronize databases for development. Our needs aren't that complex
So I think we can just perform SQL dumps. An SQL dump spits out a bunch of sql
that when loaded into a database will recreate that database.

The dump is output to stdout, so the command is like this:

```
pg_dumpall -l tldrDb -U Jeff > tldrDb_bkup_9272017
```

or in general:

```
pg_dumpall -l dbname -U username > outfilename
```

## Importing
To import we just feed the sql file back into the database
```
psql dbname < infile
```

# References
1. https://wiki.archlinux.org/index.php/PostgreSQL
2. https://www.postgresql.org/docs/9.1/static/backup-dump.html
3. https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546
4. https://wiki.postgresql.org/wiki/First_steps
