import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://semguujqacuqjryeqzgs.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbWd1dWpxYWN1cWpyeWVxemdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NTYzNzcsImV4cCI6MjA3MTUzMjM3N30.Q7WQWTXBPrBBK8z7QfE3DDedmW9Kz4yjFaIiLGWlDA4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
