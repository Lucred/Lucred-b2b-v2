const Menu = [
  { spacer: true },
  {
    title: "Dashboard",
    icon: "account-group-outline",
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Employees",
    icon: "shape-outline",
    name: "Employees",
    href: "/employees",
  },
  // {
  //   title: "Merchants",
  //   icon: "shape",
  //   name: "Merchants",
  //   href: "/merchant",
  // },
  {
    title: "Profile",
    icon: "shape",
    name: "Profile",
    href: "/profile",
  },
  { divider: true },
  { spacer: true },
  {
    title: "Logout",
    icon: "login",
    href: "/login",
  },
  {
    title: "Sign Up",
    icon: "account-circle",
    href: "/signup",
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
});

export default Menu;
