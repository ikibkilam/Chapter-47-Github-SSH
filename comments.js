// Chapter 46 - Adding version control.

// Do not ever go int git folder, since there is chance it will get corrupted. Simply, use command line tools to 
// update the repository.
// 1. To install git: To install a git repository, I started the windows bash console. Then, I went to the directory 
//    I wanted to install the git repository in. Then, I ran: git init. I can see the repository using: ls -a. Also,
//    see git-scm.com.
// 2. To install a git repository, I started the windows bash console. Then, I went to the directory I wanted to 
//    install the git repository in. Then, I ran: git init. I can see the repository using: ls -a.
// 3. Run: git status. This allows us to see the files in the folder, and which ones are tracked. Note, we need to
//    explicitly tell git, which files to track. 
// 5. Run: git add package.json. This commits package.json to the repository. And all future changes will be committed. 
//    Similarly, we can run: git add public/, to add the public folder. Note, after each addition, we can run: git status,
//    to see the files/folders that have been committed.
// 6. Once all the files/folders that need to be committed are committed, we can create a file .gitignore that keeps 
//    track of all files/folders that were not committed. I created this file in the parent folder in vscode itself. 
//    I then added this file to the commits, using: git add .gitignore. Now, we should see all files/folders being tracked. 
// 7. Last, we need to create a commit, and in this case an initial commit. The format is: git commit -m 'Message'. 

// Chapter 47 - Github SSH.

// For github: google: github ssh keys. Click on help.github.com/articles/generating-an-ssh-key/. Then click on Windows, 
// and the breadcrumb, 'Generating an SSH Key'.  I should reach: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/ 
// The basic idea is to use SSH PKI infrastructure to authenticate the user and enable authorization, and hence not use
// passwords. We do the following:
// 1. In the bash terminal: ls -a. This shows all the files and directories.
// 2. Run the command in bash: ssh-keygen -t rsa -b 4096 -c 'bikimalik@hotmail.com'. This generates the
//    public and private key pair. It prompts to store keys in a file (choose default). It says it has
//    created directory .ssh in c:/users/bikim. It prompts for passphrase twice and we choose default. It
//    says identification has been saved in c:/users/bikim/.ssh/id_rsa. It also says public key has been
//    saved in c:/users/bikim/.ssh/id_rsa.pub. It shows the key's fingerprint and randomart image.
// 3. Start SSH agent and add keys to the agent. First, we use the commands: eval "$(ssh-agent -s)". This will
//    confirm the agent process id, which means the agent is now running. Next, we tell the agent where the
//    file that has the key lives. The command: ssh-add ~/.ssh/id_rsa. This tells ssh the path to the file
//    that has the key. And the result is that the key is added.
// 4. Now we can configure Github. We go to the github site, and in settings set up the key, by clicking on
//    SSH and GPG keys. We can use the command to copy the key to the clipboard: clip < ~/.ssh/id_rsa.pub. 
//    Note, we could have also used a text editor and just copied the key. After the key is copied go to 
//    the github site and paste the key in the settings and SSH/GPG keys area. The key starts with ssh-rsa
//    and ends with bikimalik@hotmail.com.
// 5. To test the access to github, we run: ssh -T git@github.com. We should see a message, the authenticity
//    of the host 'github.com' cannot be established. It also shows the RSA public key. It asks if we want
//    to continue connecting - say yes. We are done.
// 6. We can now create a repository in github. Go to home page, and create a repository - give it a name,
//    and choose public repository.
// 7. Next, we push an existing repository in our desktop to github, running the command in the bash console:
//    git remote add origin https://github.com/ikibkilam/Chapter-47-Github-SSH.git. Note, remote lets git
//    know which URLs we want to sychronize with. So, if we want to push to github and to heroku, we need
//    two remotes. Here we are only pushing to github.
// 8. This command: git push -u origin master, actually pushes the code up to github. It might ask you to 
//    loginto github. Now the code in the folder where ran the above two commands, will show up in github,
//    once we refresh the page. We note, that only files we tracked and committed show up in github. This
//    cool!.
// 9. We do not need to touch the SSH keys again!

// Chapter 48 - Heroku.
// 1. I created an account on Heroku.
// 2. I went to toolbelt.heroku.com and installed the heroku tools.
// 3. After installation, in git bash console, I ran: heroku --version.
// 4. Then, ran: heroku --help, which installs the CLI and shows me the commands I can run with heroku in the git 
//    bash console.
// 5. I logged into heroku, using the CLI. It took me to the browser, where it logged me and said the CLI is 
//    now logged in. The CLI says logged in as bikimalik@hotmail.com. We can now communicate with Heroku.
// 6. We now get our SSH key to Heroku. Run: Heroku keys:add. This scans our laptop for the keys and adds them
//    to Heroku. It will ask me if I want to upload to Heroku - yes. This was much easier to add the SSH key
//    to Heroku. We can view all the keys uploaded to Heroku by running: heroku keys.
// 7. To remove the keys run: heroku keys: remove bikimalik@hotmail.com.
// 8. Run: ssh -v git@heroku.com, will test the connection to heroku.. We get a lot of cryptic output. Please 
//    ensure that 'authenitcation succeeded' shows. It did say that the server could not be authenticated, would
//    I like to process, and I said yes.
// 9. Now, we need to make some changes to server.js to ensure our application works with Heroku. This is 
//    because heroku will require some heroku-specific parameters. For example, the port on the web server
//    needs to be set by heroku. We can use environment variables to address this problem. Heroku can 
//    set an environemnt variable on the OS, and the node app can read that variable. All machines have environment
//    variables - use SET on Windows in the cmd prompt to see the environment variables. Note the environment 
//    variables are key-value pairs. We want Heroku to set the port, and then set an environment variable
//    called 'port', that the node app can read. 
// 10.In the code, we create a variable/constant, port. We set this to be process.env.PORT. Recall, process is
//    the global object in nodejs, and allows control over the current node.js process. process.env returns
//    an object that contains the user environment. We can create a new variable, visible within the nodejs
//    process, using, process.env.PORT. This creates an environment variable PORT, and we can store it in a JS 
//    constant. Note, since we want the same code to run locally also, we use process.env.PORT || 3000, so if 
//    PORT exists as an environment variable we use it, else we use 3000. 
// 11.Another aspect we need to adapt for heroku, is to add a script to package.json. We see there is a 
//    "scripts" property that has an object as a value. A script is a command we can run in the console. We 
//    can add scripts, such as, "start" : node server.js. We add this. Why? This is necessary, since heroku
//    does not know what file needs to be executed. The start keyword has a specific meaning that says 
//    execute this command to start execution. Heroku sees this and can now start execution.
// 12.We can run the start script locally as: npm start. And now we are running node server.js. Of course,
//     the big deal is that we are now ready for Heroku.
// 13.We run: git status, to see what files have changed. We see that package.json and server.js are files
//    that have changed and were being tracked. comments.js is not being tracked. We use: git -add filename,
//    to commit the two files, package.json and server.js. I can also use the 'git add .' command to 
//    commit all files, which is what I did. Now, git status, shows the three files under, changes to be
//    committed. Run: git commit -m "Added comments.js and updated server.js to use port on heroku".
// 14.We run: git push, to push the committed files to github. Note, we need not specify origin, since the 
//    origin is the remote.
// 15.Run: heroku create. This creates a new application in the heroku platform. Also, it adds a new remote
//    to the git repository. We already have an origin remote, that points to the github repository. Now, we
//    will get a heroku remote that points to the heroku repository. When we deploy to the heroku repository,
//    heroku sees that, it sees the changes, and it deploys them to the web.
// 16.We still need to push the code up to heroku. We do this by running: git push heroku. We see the logs
//    as the code deploys.
// 17.We now have a URL we can visit. The URL shows up at the end of the above command execution.