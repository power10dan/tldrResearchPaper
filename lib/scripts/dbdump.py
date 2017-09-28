#!/usr/bin/env python

import sys
import subprocess
import time

if __name__ == "__main__":
    print(subprocess.check_output(['ls', '-la']))
