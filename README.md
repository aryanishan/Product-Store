# Sports Gear Pro - Sports Equipment E-Commerce Platform

A modern, fully-featured sports equipment e-commerce website with professional design, search functionality, and product management system.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### Core Features
- **Product Catalog**: Browse 12+ sports products with pagination
- **Advanced Search**: Real-time search with history tracking
- **Product Details**: Detailed view with specifications and features
- **Search History**: Track, filter, and manage search queries
- **Responsive Design**: Mobile-first approach for all devices

### Design Features
- Modern gradient-based UI with professional color scheme
- Smooth animations and transitions
- Card-based product display with hover effects
- Clean typography and spacing
- Dark/light mode ready components

### Technical Features
- LocalStorage for data persistence
- Pagination system (6 items per page)
- Search filtering and sorting
- Export search history (CSV format)
- No external dependencies (vanilla JavaScript)

## Demo

### Live Preview
[Try it here](https://your-deployed-link.com) *(Add your deployment link)*

### Screenshots
| Home Page | Product Details | Search History |
|-----------|----------------|----------------|
| ![Home](screenshots/home.png) | ![Details](screenshots/details.png) | ![History](screenshots/history.png) |

## Installation

### Prerequisites
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Text editor (VS Code recommended)
- Local server (optional)

### Quick Start
1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/sports-gear-pro.git
   ```
   Or download the ZIP file and extract it.

2. **Navigate to project folder**
   ```bash
   cd sports-gear-pro
   ```

3. **Run the application**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js with http-server
     npx http-server
     ```

4. **Access the application**
   Open `http://localhost:8000` in your browser

## Project Structure

```
sports-gear-pro/
│
├── index.html              # Main homepage with product catalog
├── product.html           # Product details page
├── history.html          # Search history management page
│
├── style.css             # All CSS styles (unified file)
│
├── script.js             # Main JavaScript for homepage
├── product.js           # Product details functionality
├── history.js           # Search history management
│
├── images/              # Product images (create this folder)
│   ├── stump.jpg
│   ├── yonex-badminton-racket.jpg
│   └── ... (other product images)
│
└── README.md            # This file
```

### Image Requirements
Create an `images/` folder and add these product images:
- `stump.jpg` - Cricket stumps
- `sports-wicket-keeping-gloves-073.jpg` - Wicket keeping gloves
- `yonex-badminton-racket.jpg` - Badminton racket
- `fifa-mini-size-2-ball.jpg` - Football
- `360_F_1610220961_P7Ul9J4h8ltJpkA242NOHuoabe270G5I.jpg` - Cricket ball
- `317VTY6RngL.jpg` - Cricket bat
- `hockey-stick-1543322442-4422079.jpeg` - Hockey stick
- `DSC_1350-copy-1-scaled.webp` - Cricket helmet

*Placeholder images can be used for development*

## Usage Guide

### For Customers
1. **Browse Products**
   - Visit the homepage to see all products
   - Use pagination to navigate through products
   - Click on any product to view details

2. **Search Products**
   - Type in the search bar to filter products in real-time
   - Press Enter or click Search to save to history
   - Click on search history items to search again

3. **View Product Details**
   - Click "View Details" on any product
   - See specifications, features, and pricing
   - Use "Add to Cart" or "Buy Now" buttons

4. **Manage Search History**
   - Click "View Search History" button
   - Filter searches by time period
   - Export history or clear all records

### For Developers
#### Customizing Products
Edit the `products` array in `script.js`:
```javascript
const products = [
    {
        name: "Product Name",
        price: "999",
        image: "image.jpg",
        description: "Product description"
    },
    // Add more products here
];
```

#### Modifying Styles
Edit `style.css` to customize:
- Colors: Change CSS variables in `:root` selector
- Layout: Modify grid settings in `.products` class
- Typography: Adjust font sizes and weights

#### Adding New Pages
1. Create new HTML file
2. Link `style.css`
3. Add corresponding JavaScript file
4. Update navigation if needed

## Technical Details

### Technologies Used
- **HTML5**: Semantic markup with modern elements
- **CSS3**: Flexbox, Grid, CSS Variables, Animations
- **JavaScript (ES6+)**: Vanilla JS with modern features
- **LocalStorage API**: Client-side data persistence
- **Responsive Design**: Mobile-first approach

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Performance Features
- Efficient DOM manipulation
- Minimal re-renders with pagination
- Lazy loading ready (add `loading="lazy"` to images)
- Optimized CSS with minimal redundancy

### Storage Structure
```json
{
  "searchHistory": [
    {
      "text": "search term",
      "time": "ISO timestamp"
    }
  ],
  "selectedProduct": {
    "name": "Product Name",
    "price": "999",
    "image": "image.jpg",
    "description": "Product description"
  }
}
```

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
1. Check if the issue already exists
2. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features
1. Check existing feature requests
2. Create a new issue with:
   - Feature description
   - Use cases
   - Proposed implementation

### Code Contributions
1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Make your changes
4. Test thoroughly
5. Commit with descriptive messages
   ```bash
   git commit -m "Add amazing feature"
   ```
6. Push to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
7. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test on multiple browsers
- Ensure responsive design

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```
MIT License

Copyright (c) 2024 Sports Gear Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## Contact

### Project Maintainer
**Your Name**  
- Email: your.email@example.com  
- GitHub: [@yourusername](https://github.com/yourusername)  
- Twitter: [@yourhandle](https://twitter.com/yourhandle)  

### Support
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/sports-gear-pro/issues)
- 💡 **Feature Requests**: [GitHub Issues](https://github.com/yourusername/sports-gear-pro/issues)
- 📚 **Documentation**: This README file
- 💬 **Questions**: Open a discussion on GitHub

### Acknowledgments
- Icons from Twemoji
- Color palette from Material Design
- Inspiration from modern e-commerce platforms
- Contributors and testers

## Show Your Support

If you find this project helpful:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔄 Share with others
- ☕ [Buy me a coffee](https://buymeacoffee.com/yourprofile)

---

Made with ❤️ for sports enthusiasts

[🏠 Home](#) • [📖 Docs](#) • [🚀 Demo](#) • [💻 Code](#)

## Project Status

### Roadmap
- [x] Basic e-commerce functionality
- [x] Search with history
- [x] Product details page
- [x] Responsive design
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Product reviews
- [ ] Wishlist feature

### Known Issues
- Placeholder images required for full functionality
- LocalStorage has size limitations
- No server-side persistence
- Basic cart simulation only

---

*Last Updated: January 31, 2026*  
*Version: 2.0.0*  
*Sports Gear Pro Team*
