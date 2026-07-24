import { getPreferenceValues, MenuBarExtra, open } from "@raycast/api";
import { useFetch } from "@raycast/utils";

// To fetch Github notifications, we need a "classic" personal access token
// with the "notifications" scope.
// You can set one up at https://github.com/settings/tokens
//
// Raycast will prompt us for this token and store it securely, driven by the
// "preferences" key in package.json.
const { githubToken } = getPreferenceValues();

// Many more fields are returned from the API call, but we don't need them
// until we decide to display more information. For now, I'm happy with showing
// an unread count.
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

  // I want the item to disappear if I don't have any notifications, but we
  // still need to return it (not null) while we're loading for Raycast to keep
  // the process alive.
  if (data.length === 0) {
    return (
      <MenuBarExtra isLoading={isLoading} />
    );
  }

  return (
    <MenuBarExtra icon="GitHub_Invertocat.svg" title={`${data.length}`} isLoading={isLoading}>
      <MenuBarExtra.Item title="Open on Github" onAction={() => open("https://github.com/notifications")} />
    </MenuBarExtra>
  );
}
