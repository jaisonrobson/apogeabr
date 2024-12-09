import React from 'react'
import styled from 'styled-components'

import Container from 'components/layout/Container'
import Col from 'components/layout/Col'
import Row from 'components/layout/Row'

const StyledLink = styled((props) => <a {...props} />)`
    color: black;
    text-shadow: none;
    font-weight: 900;

    &:hover {
        color: white;
        text-shadow: none;
        font-weight: 900;
    }
`

const BookDisplay = () => (
    <Container style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 'inherit',
        width: 'inherit',
        flexDirection: 'row'
    }}>
        <Col style={{ background: "linear-gradient(90deg, rgba(198,184,112,1) 0.5%, rgba(229,217,156,1) 0.5%, rgba(229,217,156,1) 0.5%, rgba(198,184,112,1) 1.5%, rgba(229,217,156,1) 1.5%, rgba(198,184,112,1) 2.5%, rgba(229,217,156,1) 2.5%, rgba(198,184,112,1) 3.5%, rgba(229,217,156,1) 3.5%)", paddingLeft: '75px', paddingTop: '50px' }}>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tristique fermentum est, id porttitor purus vehicula id. Sed non libero id eros viverra condimentum in vitae leo. Aenean at ornare ipsum, eu pellentesque dolor. Sed pellentesque eget risus a pulvinar. Integer in aliquam urna. Nullam at magna rhoncus, venenatis lectus quis, cursus tortor. Integer erat lacus, sodales in nisl ac, interdum gravida mi. Pellentesque ornare, leo at blandit finibus, diam quam interdum lacus, id pellentesque mauris orci a ligula. Donec nisl nulla, ultricies eget lectus at, vestibulum maximus lectus. Nullam posuere metus sed interdum feugiat. Sed ex eros, efficitur ac consectetur sed, hendrerit a massa. Mauris et dolor vel ante dapibus interdum aliquet eget leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed ut erat congue, porta odio quis, elementum libero.
            </p>
            <p>
            Donec tincidunt velit ut ipsum euismod consequat. Cras tempor risus at turpis malesuada consequat. Vestibulum condimentum orci ultrices elit volutpat pretium. Duis ut elementum lorem. Vestibulum porttitor cursus dignissim. Nam velit felis, semper eu leo eget, tincidunt aliquet lectus. Donec pellentesque vitae est non ornare. In eleifend, lectus ut auctor bibendum, odio nulla molestie turpis, ut accumsan ipsum urna sit amet est.
            </p>
            <p>
            Donec aliquam augue molestie libero sagittis, pretium elementum leo auctor. Praesent vitae aliquam ipsum. Donec non ligula aliquet arcu maximus vestibulum at vitae sapien. Mauris tristique tempor nibh, vitae blandit ipsum. Fusce porta lorem sit amet velit ullamcorper mollis. Aenean mattis pellentesque libero sed maximus. Donec at elementum dui. Sed et fringilla ligula. Nunc tristique odio et arcu aliquam, eget facilisis ipsum hendrerit. Cras accumsan massa eu magna lobortis ornare. Morbi non vulputate justo. Ut cursus nulla elit, eu tincidunt mi interdum sed. Mauris sed lectus sem. Etiam semper enim sit amet purus molestie sagittis.
            </p>
            <p>
            In vulputate, velit a tincidunt congue, lacus lacus tincidunt dui, eget euismod nulla augue in libero. Suspendisse hendrerit ut tortor a tristique. Etiam blandit pretium aliquet. Suspendisse sed leo augue. Vivamus id volutpat felis, sit amet aliquet sem. Nulla sagittis ex ante, ac vestibulum mauris viverra ut. Cras vel fermentum orci. Ut tristique nulla a ipsum scelerisque tincidunt. Morbi a mollis justo. Vivamus nec tortor hendrerit, pharetra sapien vel, facilisis eros. Duis ultrices pellentesque tempor. Suspendisse varius interdum ullamcorper. Phasellus id nibh at nisl iaculis condimentum. Sed euismod vitae orci in viverra. Vivamus congue ante quis lectus pretium porta ut a ipsum.
            </p>
            <p>
            Aliquam erat volutpat. Ut et lorem gravida, convallis nisi faucibus, ornare tellus. In sodales, enim sit amet ornare accumsan, justo nibh ultricies mauris, a pulvinar tellus felis laoreet lorem. Curabitur egestas eros ipsum, ut ornare nulla blandit ut. Ut interdum imperdiet est, sed congue metus laoreet a. Praesent massa odio, malesuada in erat eu, varius molestie magna. Proin at lacus venenatis massa tincidunt vestibulum. Suspendisse posuere, velit eget lacinia molestie, ex nibh hendrerit nisl, pretium dapibus leo lectus id mi. In hac habitasse platea dictumst. Sed posuere ante eu hendrerit posuere. Cras blandit malesuada gravida. Quisque sodales mi et ultrices iaculis.
            </p>
        </Col>

        <Col style={{ background: "linear-gradient(to left, rgba(229,217,156,0) 5%, rgba(229,217,156,1) 15%, rgba(229,217,156,1) 80%, rgba(198,184,112,1) 84%, rgba(166,152,82,1) 84%, rgba(198,184,112,1) 86%, rgba(229,217,156,1) 91%)", height: "100%", width: '100%', maxWidth: '500px', paddingLeft: '180px', paddingTop: '50px' }}>
            <Row style={{ marginTop: '15px' }}>
                <StyledLink href=''>Link 1</StyledLink>
            </Row>
            <Row style={{ marginTop: '15px' }}>
                <StyledLink href=''>Link 2</StyledLink>
            </Row>
        </Col>
    </Container>
)

export default BookDisplay