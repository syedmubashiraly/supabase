
const {createClient} = supabase
const supabaseUrl = 'https://fjhybiycaxgukvviutmf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaHliaXljYXhndWt2dml1dG1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODA5MDAsImV4cCI6MjA1MjI1NjkwMH0.bSETe8tBSZhM5qlm-exM4Su9Tq_URv-H5zvoSsS-bRU'
const supabaseClient = createClient(supabaseUrl, supabaseKey)
window.supabase = supabaseClient
console.log('supabase')