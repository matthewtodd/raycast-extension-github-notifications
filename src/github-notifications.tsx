import { getPreferenceValues, MenuBarExtra, open } from "@raycast/api";
import { useFetch } from "@raycast/utils";

// This extension is configured (by the preferences key in package.json) such
// that Raycast will prompt for and securely store the Github personal access
// token it needs to operate.
//
// To generate a suitable token, create a "classic" token with the
// "notifications" scope at https://github.com/settings/tokens
const { githubToken } = getPreferenceValues();

// Taken from https://brand.github.com/foundations/logo
const GithubLogo = {
  source: {
    light: "GitHub_Invertocat_Black.svg",
    dark: "GitHub_Invertocat_White.svg",
  },
};

// We can add more fields to this type if we ever want the menu bar to display
// anything more than a count. For now, I prefer the simple count.
type Notification = { id: string };

export default function Command() {
  const { data, isLoading } = useFetch<Notification[], Notification[]>("https://api.github.com/notifications", {
    headers: { Authorization: `bearer ${githubToken}` },
    initialData: [] as Notification[],
    keepPreviousData: true,
  });

  // I want the item to disappear if I don't have any notifications.
  // Unfortunately I can't just return null in that case because Raycast needs
  // to look at the isLoading property when a request is in flight.
  const icon = data.length > 0 ? GithubLogo : undefined;
  const title = data.length > 0 ? `${data.length}` : undefined;

  return (
    <MenuBarExtra icon={icon} title={title} isLoading={isLoading}>
      <MenuBarExtra.Item title="Open on Github" onAction={() => open("https://github.com/notifications")} />
    </MenuBarExtra>
  );
}
