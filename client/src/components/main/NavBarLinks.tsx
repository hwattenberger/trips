import { Link } from 'react-router-dom';

interface NavBarLinksProps {
    token: string | null,
    showLink: boolean
}

const NavBarLinks: React.FC<NavBarLinksProps> = ({ token, showLink }) => {

    function linkClassName() {
        if (!showLink) return "hideDiv";
        return "showDiv"
    }

    if (!token) return (
        <div id="navbar-links" className={linkClassName()}>
            <div><Link to={`/trips`}>All Trips</Link></div>
        </div>
    )

    return (
        <div id="navbar-links" className={linkClassName()}>
            <div><Link to={`/trips`}>All Trips</Link></div>
            <div><Link to={`/trips/me`}>My Trips</Link></div>
            <div><Link to={`/trips/new`}>Create Trip</Link></div>
        </div>
    )
}

export default NavBarLinks;