const Link = (name, label, path, isAdmin = false) => ({
  name,
  label,
  path,
  isAdmin,
});

export const links = [
  Link("Home", "Home", "/"),
  Link("Sleep", "Sleep", "/sleep"),
  Link("Challanges", "Challanges", "/challanges"),
  Link("Statistics", "Statistics", "/statistics"),
  Link("Changelog", "Changelog", "/changelogs", true),
];
