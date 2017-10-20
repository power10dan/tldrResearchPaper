import subprocess
import os

def execute_maven():
	subprocess.call(['mvn', 'test'], shell=True)
