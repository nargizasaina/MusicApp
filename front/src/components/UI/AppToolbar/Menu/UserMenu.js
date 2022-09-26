import React from 'react';

const UserMenu = ({user}) => {
    return (
        <div>
            Hello, {user.username}!
        </div>
    );
};

export default UserMenu;