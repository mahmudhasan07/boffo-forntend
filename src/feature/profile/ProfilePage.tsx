import SharedTabs from '@/components/sharedTabs/SharedTabs';
import AllProducts from '../products/AllProducts';
import Profile from './Profile';
import ChangePasswords from './ChangePasswords';


const TAB_ITEMS = [
    {
        value: 'profile', label: 'Profile', component: <Profile />
    },
    {
        value: 'passwords', label: 'Change Passwords', component: <ChangePasswords />
    },
    {
        value: 'all-items', label: 'All Items', component: <AllProducts />
    },


    // {
    //     value: 'returned-project', label: 'Return Order', component: <div>dfdfw</div>
    // },
];


const ProfilePage = () => {
    return (
        <div className='container section-gap'>
            {/* <ProfileCard /> */}
            <SharedTabs tabItems={TAB_ITEMS} />
        </div>
    );
};

export default ProfilePage;