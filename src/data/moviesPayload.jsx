
import Screenshot1 from 'images/screenshots/screenshot1.png'
import Screenshot2 from 'images/screenshots/screenshot2.png'
import Screenshot3 from 'images/screenshots/screenshot3.png'
import Screenshot4 from 'images/screenshots/screenshot4.png'
import Screenshot5 from 'images/screenshots/screenshot5.png'
import Screenshot6 from 'images/screenshots/screenshot6.png'
import Screenshot7 from 'images/screenshots/screenshot7.png'
import Screenshot8 from 'images/screenshots/screenshot8.png'
import Screenshot9 from 'images/screenshots/screenshot9.png'
import Screenshot10 from 'images/screenshots/screenshot10.png'
import Screenshot11 from 'images/screenshots/screenshot11.png'
import Screenshot12 from 'images/screenshots/screenshot12.png'
import Screenshot13 from 'images/screenshots/screenshot13.png'
import Screenshot14 from 'images/screenshots/screenshot14.png'
import Screenshot15 from 'images/screenshots/screenshot15.png'
import Screenshot16 from 'images/screenshots/screenshot16.png'

const moviesPayload = [
    {
        title: 'Waking up Well',
        content: `Nunc nec malesuada erat. Nulla sit amet orci vitae purus maximus bibendum. Aenean arcu tellus, ultricies non nulla vel, vehicula iaculis lacus. Pellentesque auctor tortor enim, at condimentum mi blandit sed. Nunc mattis enim a mauris ultricies, tincidunt sollicitudin purus convallis. Nunc ac ligula placerat, suscipit risus quis, accumsan metus. Fusce efficitur cursus nulla, non luctus elit imperdiet quis. Nunc massa est, pulvinar vel feugiat vitae, mattis in ante.
        <p>In hac habitasse platea dictumst. Sed a metus ut massa venenatis tristique sed venenatis felis. Praesent nec luctus mauris. Nunc pulvinar eleifend vestibulum. Nunc erat diam, molestie pellentesque blandit non, convallis eu tortor. Pellentesque posuere justo sed dictum facilisis. Fusce lobortis feugiat nisi, vel molestie orci interdum vel. Praesent euismod tempor nisi vel dapibus. Pellentesque maximus, mi nec bibendum iaculis, felis leo efficitur lorem, eu volutpat nunc augue nec nisi. Proin blandit diam elit, at ultrices nunc facilisis vel. Sed eleifend purus ac pharetra varius. Nullam enim nibh, tincidunt eget tincidunt placerat, egestas sit amet est.</p>
        <p>Mauris at metus at lectus ultricies malesuada eu et purus. Curabitur imperdiet justo vel massa laoreet, ut ornare sapien pharetra. Pellentesque sed nulla pellentesque, imperdiet felis sit amet, rhoncus lectus. Phasellus auctor eros vel nulla dignissim, nec elementum orci bibendum. Donec porttitor ultricies risus vitae fermentum. Phasellus eleifend ex a orci ornare, vitae tristique diam congue. Mauris luctus nibh vel turpis porttitor faucibus. In fermentum enim eget tortor feugiat ultricies. Pellentesque eu sagittis dolor, vitae laoreet tellus. Donec ac sodales leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris ut arcu neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer nec suscipit dui, faucibus lacinia ex. Maecenas et nisl pharetra, blandit eros nec, aliquam magna. Mauris nec congue massa.</p>`,
        genre: 'Casual',
        year: 2006,
        duration: 45,
        imageSrc: Screenshot1,
    },
    {
        title: 'Life and Death',
        content: 'Morbi bibendum quis nisl quis fringilla. Nunc blandit ligula in.',
        genre: 'Documentary',
        year: 2010,
        duration: 50,
        imageSrc: Screenshot2,
    },
    {
        title: 'High Speed',
        content: 'Curabitur ultrices ullamcorper neque, dictum sagittis massa ultricies sed. Maecenas.',
        genre: 'Action',
        year: 2012,
        duration: 75,
        imageSrc: Screenshot3,
    },
    {
        title: 'Sweet Youth',
        content: 'Aliquam eget risus mi. Pellentesque lobortis mi leo, quis accumsan.',
        genre: 'Casual',
        year: 2008,
        duration: 63,
        imageSrc: Screenshot4,
    },
    {
        title: 'Colors of Nature',
        content: 'Sed sollicitudin gravida nulla, nec finibus lorem. Sed ac libero.',
        genre: 'Documentary',
        year: 2009,
        duration: 45,
        imageSrc: Screenshot5,
    },
    {
        title: 'Unbelievable Journey',
        content: 'Pellentesque massa leo, venenatis tristique lorem non, aliquet porttitor libero.',
        genre: 'Adventure',
        year: 2016,
        duration: 127,
        imageSrc: Screenshot6,
    },
    {
        title: 'Hidden Temples',
        content: 'Sed ac est tincidunt odio suscipit rutrum. Curabitur fermentum finibus.',
        genre: 'Documentary',
        year: 2010,
        duration: 49,
        imageSrc: Screenshot7,
    },
    {
        title: 'Mountain King',
        content: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.',
        genre: 'Action',
        year: 2018,
        duration: 135,
        imageSrc: Screenshot8,
    },
    {
        title: 'Beautiful in Everything',
        content: 'Nullam tellus ante, luctus ac mollis sed, vulputate vitae nulla.',
        genre: 'Documentary',
        year: 2013,
        duration: 70,
        imageSrc: Screenshot9,
    },
    {
        title: 'After Midnight',
        content: 'Donec mattis sem eu tristique egestas. Ut eleifend est dolor.',
        genre: 'Horror',
        year: 2020,
        duration: 140,
        imageSrc: Screenshot10,
    },
    {
        title: 'Tales of Nasdaria',
        content: 'In tempus ut neque nec convallis. Aenean mollis mi tristique.',
        genre: 'Fantasy',
        year: 2020,
        duration: 120,
        imageSrc: Screenshot11,
    },
    {
        title: 'Beyond the Sky',
        content: 'Curabitur sit amet laoreet velit. Nulla tincidunt velit augue, consequat.',
        genre: 'Sci-fy',
        year: 2021,
        duration: 138,
        imageSrc: Screenshot12,
    },
    {
        title: 'Fight to Death',
        content: 'Quisque a blandit massa. Morbi id dapibus est, id interdum.',
        genre: 'Sci-fy',
        year: 2019,
        duration: 118,
        imageSrc: Screenshot13,
    },
    {
        title: 'Castle of Dracula',
        content: 'Aenean quam massa, consectetur vitae nulla ut, malesuada accumsan arcu.',
        genre: 'Horror',
        year: 2020,
        duration: 102,
        imageSrc: Screenshot14,
    },
    {
        title: 'Signs of Lazyness',
        content: 'Praesent et sapien aliquet metus suscipit commodo eu in urna.',
        genre: 'Documentary',
        year: 2012,
        duration: 33,
        imageSrc: Screenshot15,
    },
    {
        title: 'Exercise and Health',
        content: 'Sed lobortis vulputate tortor a feugiat. Quisque augue urna, accumsan.',
        genre: 'Documentary',
        year: 2017,
        duration: 40,
        imageSrc: Screenshot16,
    },
]

export default moviesPayload