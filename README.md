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
                     From the Home Page
                  The User Has FOUR OPTIONS
==========================================================================


① CREATE NEW NOTE
──────────────────────────────────────────────────────────────────────────

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
     Creates a new .txt file
         inside ./files
                  │
                  ▼
          Redirect back to /
                  │
                  ▼
       New note appears on
          the Home Page


② OPEN NOTE
──────────────────────────────────────────────────────────────────────────

          Click "Open"
                  │
                  ▼
      GET /files/:filename
                  │
                  ▼
          fs.readFile()
                  │
                  ▼
          📄 open.ejs Page
                  │
                  ▼
     Displays Title & Content


③ EDIT NOTE
──────────────────────────────────────────────────────────────────────────

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
      User edits title/content
                  │
                  ▼
      Click "💾 Save Changes"
                  │
                  ▼
            POST /edit
                  │
                  ▼
              fs.rename()
          old name → new name
                  │
                  ▼
            fs.writeFile()
          saves new content
                  │
                  ▼
             Redirects to /
                  │
                  ▼
           Back to Home Page,
       note shows updated info


④ DELETE NOTE
──────────────────────────────────────────────────────────────────────────

          Click "Delete"
                  │
                  ▼
          POST /delete
                  │
                  ▼
           fs.unlink()
                  │
                  ▼
      File removed from ./files
                  │
                  ▼
        Redirect back to /
                  │
                  ▼
        Note disappears

                            💡 KEY IDEA

        There is NO database.
                  │
                  ▼
   Every note is simply a .txt file
      stored inside ./files folder.
                  │
                  ▼
     Express routes perform file operations
                  │
                  ▼
      EJS templates display the result
             as HTML pages.
