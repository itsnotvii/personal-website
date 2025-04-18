// TileGrid Component
function TileGrid() {
    const [revealedTiles, setRevealedTiles] = React.useState(0);
    const rows = 15;
    const cols = 10;
    const totalTiles = rows * cols;
  
    const handleTileHover = () => {
      setRevealedTiles(prev => {
        const newCount = prev + 1;
        if (newCount === totalTiles) {
          document.getElementById('react-tile-grid').classList.add('revealed');
        }
        return newCount;
      });
    };
  
    return (
      <div className="tile-grid">
        {Array.from({ length: totalTiles }).map((_, index) => (
          <div 
            key={index}
            className="tile"
            onMouseEnter={handleTileHover}
          />
        ))}
      </div>
    );
  }
  
  // ContactForm Component
  function ContactForm() {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      try {
        const response = await fetch("http://localhost:3001/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        alert("Thanks for reaching out!");
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        alert("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Message Me!'}
        </button>
      </form>
    );
  }
  
  // Mount Components when DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    // Mount TileGrid
    const tileGridContainer = document.getElementById('react-tile-grid');
    if (tileGridContainer) {
      ReactDOM.createRoot(tileGridContainer).render(<TileGrid />);
    }
  
    // Mount ContactForm
    const contactFormContainer = document.getElementById('contact-form');
    if (contactFormContainer) {
      ReactDOM.createRoot(contactFormContainer).render(<ContactForm />);
    }
  });