const Field = (name, type, label, subFields = []) => ({
  name,
  type,
  label,
  subFields,
});

const defaultSubField = [Field("summary", "textarea"), Field("items", "list")];

export const changelogFields = [
  Field("ver", "input", "Version"),
  Field("verName", "input", "Version name"),
  Field("summary", "textarea", "Version summary"),
  Field("isBeta", "checkbox", "Is beta version"),
  Field("isCurrent", "checkbox", "Is current version"),
  Field("added", "list", "New features", defaultSubField),
  Field("changes", "list", "Changes", defaultSubField),
  Field("fixes", "list", "Fixes", defaultSubField),
  Field("removed", "list", "Removed", defaultSubField),
];
