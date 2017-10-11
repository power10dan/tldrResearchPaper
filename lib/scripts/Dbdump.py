# purposefully missing the shebang, this should default to virtualenv python

############################## Description ####################################
# This script will automatically do the database dump for you when you run it
# in the scripts directory. We need a django backend to abstract it to project
# root.

############################## TODO ###########################################

# 1) Add check for postgresql server running. This is done through pg_ctl but
#      requires super user access to the db, which I don't want to automate
# 2) abstract paths to root of project

############################## Script #########################################

import sys           # to handle input arguments
import subprocess    # to run shell commands
import time          # to get date time for file suffix
import getpass       # to get username and hostname o
import psycopg2      # For postgresql status checking
import os            # for environment variables

outfilename = "tldr_bkup_"
timedate = time.strftime("_%d_%m_%Y_") + time.strftime("%H%M%S")
dbname = "tldrDb"
outpath = "../../bkups/"
pgdata = "PGDATA"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: dbdump dbUserName")
        sys.exit()
    else:
        # check if for environment variable
        if pgdata not in os.environ:
            print("I Couldn't find PGDATA on your PATH, please make sure the"
            "postgresql data directory is in your environment as "
            "variable PGDATA. You'll probably set this in ~/.bashenv or"
            "something similar")
            sys.exit()
        else:
            # define readable vars
            username = sys.argv[1]
            outfile = outpath + outfilename + username + timedate

            # perform the data base dump, capturing stdout
            dump = subprocess.run(["pg_dumpall", "-l", dbname, "-U", username]
                                  , stdout=subprocess.PIPE).stdout.decode("utf-8")
            
            # write dump to the new outfile
            with open(outfile, "w") as f:
                f.write(dump)

            print("All done!")
            sys.exit()
