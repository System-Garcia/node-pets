import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'species',
    path: '/dashboard/pets',
    icon: icon('ic_specie'),
  },
  {
    title: 'Rewards',
    path: '/dashboard/rewards',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/dashboard/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/dashboard/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
