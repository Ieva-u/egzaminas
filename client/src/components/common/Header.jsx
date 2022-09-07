import NavBar from './NavBar';

function Header({ title }) {

    return (
        <div>
            <section className="header">
                <section className="header-title">
                    <h1>{title}</h1>
                </section>
                <section className="header-navbar">
                    <NavBar />
                </section>
            </section>
            <hr className='hline' />
        </div>
    );
}

Header.defaultProps = {
    title: 'Event Organizer Dashboard',
};

export default Header;
