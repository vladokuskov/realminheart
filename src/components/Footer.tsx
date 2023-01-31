const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer">
      <p className="footer-copy">{`© ${year} ' REALMINHEART`}</p>
    </div>
  );
};

export default Footer;
