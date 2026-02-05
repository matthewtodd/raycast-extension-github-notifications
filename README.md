# Github Notifications

This is a [Raycast extension](https://developers.raycast.com/) for
showing a count of unread [Github
notifications](https://github.com/notifications) in your menu bar.

It is nearly identical to the "Unread Notifications" command in the
Raycast-provided [Github extension](https://www.raycast.com/raycast/github),
which you may prefer. The primary difference is that this one refreshes far
more frequently, every minute instead of every fifteen minutes.

![screenshot](/assets/screenshot.png)

## Install

If you don't use [Raycast](https://www.raycast.com/), you can install it at
that download link or `brew install raycast.`

Then you'll need to create a Github "classic" style [personal access
token](https://github.com/settings/tokens/new) with the "notifications" OAuth
scope. (Keep this handy for the next step.)

Then install this extension:

```
git clone https://github.com/matthewtodd/raycast-extension-github-notifications.git && cd raycast-extension-github-notifications
which npm || brew install node
npm install && npm run dev
```

Type "github notifications" in the Raycast window and follow your nose!

At this point, the extension is installed and you can ctrl-c to kill the watcher process in the terminal.
