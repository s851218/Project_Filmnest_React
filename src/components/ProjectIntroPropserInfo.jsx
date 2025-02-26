export default function ProjectIntroProposerInfo() {
  return (
    <>
      <div className="d-flex p-3 p-md-5 bg-primary-9-transparent rounded-1 rounded-md-2">
        <img
          className="object-fit-cover rounded rounded-md-1 img-director"
          src="/assets/images/遠端對話劇照/遠端對話導演照/導演照1.jpg"
          alt="追風者導演照片"
        />
        <div
          className="ms-3 ms-md-7 d-flex flex-column justify-content-between"
          style={{ width: 552 }}
        >
          <div>
            <h3 className="fs-base fs-md-7 mb-2">
              <a
                className="text-white title-hover"
                href="aboutProposal-now.html"
              >
                春日影像製作 Spring Film
              </a>
            </h3>
            <section className="d-flex gap-4">
              <a
                className="fs-sm fs-md-base icon-text-hover"
                href="aboutProposal-fin.html"
              >
                <span className="material-symbols-outlined align-bottom text-primary-5 me-0 me-md-1">
                  star
                </span>
                3 個專案
              </a>
              <a
                className="fs-sm fs-md-base icon-text-hover"
                href="aboutProposal-now.html"
              >
                <span className="material-symbols-outlined align-bottom text-primary-5 me-0 me-md-1">
                  person
                </span>
                周先生
              </a>
            </section>
          </div>
          <section className="d-flex align-items-center">
            <ul className="list-unstyled mb-0 d-flex gap-3">
              <li>
                <a href="#">
                  <i className="bi bi-facebook fs-6 social-media-hover" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-instagram fs-6 social-media-hover" />
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-line fs-6 social-media-hover" />
                </a>
              </li>
            </ul>
            <a
              className="btn btn-secondary fs-sm ms-auto"
              href="aboutProposal-now.html"
            >
              聯絡我們
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
