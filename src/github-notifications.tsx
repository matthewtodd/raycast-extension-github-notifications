import { getPreferenceValues, MenuBarExtra, open } from "@raycast/api";
import { useFetch } from "@raycast/utils";

// This extension is configured (by the preferences key in package.json) such
// that Raycast will prompt for and securely store the Github personal access
// token it needs to operate.
//
// To generate a suitable token, create a "classic" token with the
// "notifications" scope at https://github.com/settings/tokens
const { githubToken } = getPreferenceValues();

// We can add more fields to this type if we ever want the menu bar to display
// anything more than a count. For now, I prefer the simple count.
type Notification = { id: string };

export default function Command() {
  // https://docs.github.com/en/rest/activity/notifications?apiVersion=2022-11-28
  const { data, isLoading } = useFetch<Notification[], Notification[]>("https://api.github.com/notifications", {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `bearer ${githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    initialData: [] as Notification[],
    keepPreviousData: true,
  });

  // I want the item to disappear if I don't have any notifications.
  // We need to return the MenuBarExtra while we're loading for Raycast to keep
  // the process alive.
  if (!isLoading && data.length === 0) {
    return null;
  }

  return (
    <MenuBarExtra icon="GitHub_Invertocat.svg" title={`${data.length}`} isLoading={isLoading}>
      <MenuBarExtra.Item title="Open on Github" onAction={() => open("https://github.com/notifications")} />
    </MenuBarExtra>
  );
}
