import { Redirect } from 'expo-router';

export default function Index() {
  // Check auth later, redirecting to login for now
  return <Redirect href="/(auth)/login" />;
}
