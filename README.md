# tldrApp this time with a sane directory structure

```
.
├── bkups                 # To hold DB backups
│   ├── tldr_bkup_Jeff_05_10_2017_192032
│   ├── tldr_bkup_Jeff_28_09_2017_163052
│   └── tldr_bkup_Jeff_28_09_2017_165721
├── lib		  			  # For any external programs
│   └── scripts
│       └── Dbdump.py
├── LICENSE
├── manage.py
├── README.md
└── uploads				  # The root app directory
    ├── core			  # for core python stuff
    │   ├── admin.py
    │   ├── apps.py
    │   ├── __init__.py
    │   ├── models.py
    │   ├── __pycache__
    │   │   ├── admin.cpython-36.pyc
    │   │   ├── __init__.cpython-36.pyc
    │   │   ├── models.cpython-36.pyc
    │   │   └── views.cpython-36.pyc
    │   ├── tests.py
    │   └── views.py
    ├── __init__.py
    ├── migrations		  # holds django migrations
    │   ├── 0001_initial.py
    │   └── __init__.py
    ├── __pycache__
    │   ├── __init__.cpython-36.pyc
    │   ├── settings.cpython-36.pyc
    │   ├── urls.cpython-36.pyc
    │   └── wsgi.cpython-36.pyc
    ├── requirements			# holds different requirement files
    │   └── requirements_dev.txt
    ├── settings				# holds different setting files
    │   ├── __pycache__
    │   │   └── settings.cpython-36.pyc
    │   └── settings.py
    ├── static					# site specific static files (css, html)
    ├── templates				# site specific templates	
    │   └── base.html
    ├── tests				    # all testing files
    │   └── smallTest.py
    ├── tmp						# anything that is needed but could be 
							    # deleted at anytime and it would be ok
    ├── urls.py
    └── wsgi.py
```
