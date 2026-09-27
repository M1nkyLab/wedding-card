const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dfmnjocvoiqdilcpjpvp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbW5qb2N2b2lxZGlsY3BqcHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0Nzg4OTksImV4cCI6MjEwNjA1NDg5OX0.ESRMINUBmFz1ae2Pta2xfYxwk3JYkQxEUNfzNWpVLq0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDB() {
  console.log("Attempting to insert test message...");
  const { data, error } = await supabase.from('rsvps').insert([{
    name: 'Test System',
    attend: 'Hadir',
    guests: '1',
    message: 'This is a test message to verify the DB.',
    photo_data: ''
  }]);

  if (error) {
    console.error("INSERT ERROR:", error.message);
  } else {
    console.log("Insert successful!");
  }

  console.log("Attempting to read messages...");
  const { data: readData, error: readError } = await supabase.from('rsvps').select('*');
  if (readError) {
    console.error("READ ERROR:", readError.message);
  } else {
    console.log("Read successful! Found", readData.length, "rows.");
  }
}

testDB();
