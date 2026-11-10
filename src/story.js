export const siteConfig={title:'Eternally, Mommy',musicPath:'/audio/a-thousand-years.mp3',defaultMusicVolume:.32,sceneDuration:15000};
export const chapters=[
{id:'capstone',number:'I',title:'Before There Was Us',subtitle:'Our capstone days, 2025',message:'Back in 2025, during our capstone days, I never imagined that someone so special was already becoming part of my story. Somewhere between ordinary moments, I started liking you.',tone:'midnight'},
{id:'crush',number:'II',title:'The Secret Between Us',subtitle:'The sweetest plot twist',message:'I was secretly falling for you. What I did not know was that you had a crush on me too -- and that you had liked me for a long time already.',tone:'violet'},
{id:'confession',number:'III',title:'March 16',subtitle:'The day our feelings found their way home',message:'During our OJT days, we finally confessed. I thought I was the one falling first. But you had been waiting for me all along.',tone:'rose'},
{id:'memories',number:'IV',title:'Our Memory Constellation',subtitle:'Little moments, held like stars',message:'Every photograph is a small piece of our universe -- proof that the ordinary became beautiful because I shared it with you.',tone:'memory',kind:'photos',hold:true},
{id:'flowers',number:'V',title:'Our Flower Garden',subtitle:'Eight flowers for eight months',message:'Each flower carries one reason my heart keeps choosing you. Touch them and let our garden bloom.',tone:'garden',kind:'flowers',hold:true},
{id:'gratitude',number:'VI',title:'For Every Gentle Day',subtitle:'Thank you for staying beside me',message:'Thank you for supporting me, understanding me, and giving me patience even when I cannot find the right words. Your love makes hard days feel lighter.',tone:'dawn'},
{id:'letter',number:'VII',title:'A Letter for Mommy',subtitle:'Words with no time limit',message:"There are some words that deserve to be held, not hurried. Open Daddy's letter whenever you are ready.",tone:'letter',kind:'letter',hold:true},
{id:'promise',number:'VIII',title:'Wherever Life Takes Us',subtitle:'Our promise is still connected',message:'Even if responsibilities place distance between us someday, I will keep working toward the life we dream about -- and toward you.',tone:'promise',kind:'promise',hold:true}];
export const flowers=[['Sakura','Our beginning'],['Lily','Your gentle heart'],['Sunflower','The happiness you bring'],['Lavender','Your quiet strength'],['Tulip','Your affection'],['Rose','The way you love me'],['Hydrangea','Every little kindness'],["Baby's Breath",'My forever with you']];
export const memories=Array.from({length:13},(_,i)=>({src:`/photos/memory-${String(i+1).padStart(2,'0')}.jpg`,caption:['A moment I would choose again','Our kind of happiness','The sweetest part of my story','Us, exactly as we are','A little piece of forever','One of my favorite days','Home is wherever you are','The smile I keep coming back to','Another star in our universe','The ordinary made beautiful','A memory held close','My favorite person, always','One more chapter of us'][i]}));
export const loveLetter=`My dearest Mommy,

Happy monthsary, my love.

Back in our capstone days, I thought my feelings were a secret I carried alone. Finding out that your heart had quietly been waiting too is still my favorite plot twist. March 16 gave a name to something that had already been growing between us.

Thank you for your patience, your support, your playful side, and the softness you bring into my life. Thank you for understanding me on the days when I struggle to explain myself. You make the simplest moments feel meaningful.

I cannot promise that every season will be easy, but I can promise that I will keep choosing us. Whatever responsibilities come, I will keep building toward our future and finding my way back to you.

I love you -- sincerely, steadily, and more with every chapter.

Forever your Daddy.`;