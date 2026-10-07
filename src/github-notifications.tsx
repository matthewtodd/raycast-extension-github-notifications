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
// an unread count and each title.
// Should I want to fetch any of the urls associated with the notification,
// I'll need to grant more scopes to my personal access token.
type Notification = {
  id: string;
  subject: { title: string; };
};

const Icon = {
  source: {
    light: "GitHub_Invertocat.svg",
    dark: "GitHub_Invertocat@dark.svg",
  },
};

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

  if (data.length === 0) {
    if (isLoading) {
      return (<MenuBarExtra isLoading={isLoading} />);
    } else {
      return null;
    }
  }

  return (
    <MenuBarExtra icon={Icon} title={`${data.length}`} isLoading={isLoading}>
      {data.map((notification) => (
        <MenuBarExtra.Item key={notification.id} title={notification.subject.title} onAction={() => open("https://github.com/notifications")} />
      ))}
    </MenuBarExtra>
  );
}
