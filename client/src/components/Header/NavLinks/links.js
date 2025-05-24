const Link = (name, label, path, isAdmin = false) => ({
  name,
  label,
  path,
  isAdmin,
});

export const links = [
  Link("home", "Home", "/"),
  Link("sleep", "Sleep", "/sleep"),
  Link("challenges", "Challenges", "/challenges", true),
  Link("statistics", "Statistics", "/statistics"),
  Link("changelog", "Changelog", "/changelogs", true),
];
