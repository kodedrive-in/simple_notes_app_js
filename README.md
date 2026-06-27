                     📝 HOW THE "MY NOTES" APP WORKS

                              🚀 Server Starts
                         app.listen(3000) (index.js)
                                      │
                                      ▼
                           User visits http://localhost:3000
                                      │
                                      ▼
                                  GET /
                                      │
                                      ▼
                         fs.readdir("./files")
                                      │
                                      ▼
                               🏠 Home Page
                               (index.ejs)
      ---------------------------------------------------------
      |                                                       |
      | Shows "Create New Note" Form                          |
      | Shows all existing notes from ./files folder          |
      ---------------------------------------------------------
                                      │
                                      ▼
                         📁 ./files Folder (Text Files)
      ---------------------------------------------------------
      | shopping-list.txt | ideas.txt | todo.txt | ...        |
      ---------------------------------------------------------

==========================================================================
From the Home Page, the user has FOUR OPTIONS
==========================================================================

① CREATE NEW NOTE
-----------------
User enters:
    • Title
    • Note Content
            │
            ▼
     Click "📝 Save Note"
            │
            ▼
        POST /create
            │
            ▼
 fs.writeFile(title + ".txt")
            │
            ▼
 New text file created in ./files
            │
            ▼
 Redirect back to Home Page (/)
            │
            ▼
 New note appears


② OPEN NOTE
------------
Click "Open"
      │
      ▼
GET /files/:filename
      │
      ▼
fs.readFile()
      │
      ▼
📄 open.ejs
      │
      ▼
Displays:
    • Title
    • Full Note Content (Read Only)


③ EDIT NOTE
------------
Click "Edit"
      │
      ▼
GET /edit/:filename
      │
      ▼
fs.readFile()
      │
      ▼
✏️ edit.ejs
      │
      ▼
User changes:
    • Title
    • Content
      │
      ▼
Click "💾 Save Changes"
      │
      ▼
POST /edit
      │
      ▼
fs.rename(oldName → newName)
      │
      ▼
fs.writeFile(newContent)
      │
      ▼
Redirect back to Home Page
      │
      ▼
Updated note is displayed


④ DELETE NOTE
--------------
Click "Delete"
      │
      ▼
POST /delete
      │
      ▼
fs.unlink()
      │
      ▼
Text file removed from ./files
      │
      ▼
Redirect back to Home Page
      │
      ▼
Note disappears


==========================================================================
💡 KEY IDEA
==========================================================================

There is NO database.

Each note is simply a .txt file stored inside the ./files folder.

Express routes perform:
    • fs.readdir()  → List notes
    • fs.writeFile() → Create / Update notes
    • fs.readFile()  → Open notes
    • fs.rename()    → Rename notes
    • fs.unlink()    → Delete notes

EJS templates convert this data into HTML pages that users interact with.
