import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './Layout';
import Diary from './widgets/Diary';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout maxWidth="6xl">
        <Diary />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
