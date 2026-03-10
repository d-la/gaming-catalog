## Gaming Catalog

A modern game discovery app built with Next.js that lets users browse and explore video games using live data from the RAWG API.

- **Live site**: `https://gaming-catalog.vercel.app/`
- **Tech stack**: Next.js (App Router), TypeScript, React, Tailwind CSS, RAWG API, Vercel

---

## What this project demonstrates

- **Frontend engineering**: 
    - Modern React patterns with the Next.js App Router
    - Server components and client components where appropriate
        - Example:
            - `/components/ui/GameCard.tsx` is a server component which recieves game data as props and renders the game card markup entirely on the server. This helps with initial load performance and search engine visibility.
            - `/components/ui/CatalogGridWrapper.tsx` is a client component and handles interactive functionality such as reading and reacting to URL query parameters (`page` and `stores` currently), fetches data from the RAWG API and filters on URL query parameter changes, and implements an infinite scroll using the `IntersectionObserver` API and updates the query string with `useRouter`
    - Reusable UI components (e.g. back to top button, game card, store icons, slide in animation wrapper)

- **API integration**:
    - Integration with the **RAWG** public games API
    - Basic error handling and loading states for API calls
    - Environment-based configuration for API keys (in `.env`)

- **User Experience**:
    - Responsive design so the catalog is usable on desktop and mobile
    - Loading and error states

---

## Roadmap / What’s coming next

I’m actively studying and plan to continue building this app. Some of the new features in my roadmap are:

- **User experience improvements**
    - Set a maximum amount of times the user can infinite load before displaying a "load more" button, allowing the user to see the footer

- **Search & filters**  
    - Search by game title
    - Additional filter to the existing Store filter
    - Sorting 

- **User features**  
    - Simple user profiles with ability to wishlist/save games 

- **Engineering & quality**  
    - More robust error states and empty states  
    - Unit/integration tests around key components  
    - Performance tuning and accessibility improvements  

---

## Running the project locally

1. **Clone the repo**
    
    ```bash
    git clone https://github.com/d-la/gaming-catalog.git
    cd gaming-catalog
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```
3. **Set up environment variables**

    Create a `.env` file in the root of the project and add your RAWG API Key (Rawg API is free to use with limitations on API calls)

    ```
    RAWG_API_KEY=YOUR_API_KEY
    API_BASE_URL=https://api.rawg.io/api/
    ```
4. **Start the development server**

    ```
    npm run dev
    ```