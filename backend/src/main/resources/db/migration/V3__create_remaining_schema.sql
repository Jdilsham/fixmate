

-- ======================================================
-- Service_Category
-- ======================================================
CREATE TABLE IF NOT EXISTS service_category (
     category_id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description VARCHAR(750),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

-- ======================================================
-- Service
-- ======================================================
CREATE TABLE IF NOT EXISTS service (
    service_id BIGSERIAL PRIMARY KEY,
    category_id BIGINT,
    title VARCHAR(250) NOT NULL,
    description VARCHAR(750),
    base_price DECIMAL(12,2) DEFAULT 0.00,
    duration_estimate VARCHAR(80),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_service_category
    FOREIGN KEY (category_id)
    REFERENCES service_category(category_id) ON DELETE SET NULL
    );

CREATE INDEX IF NOT EXISTS idx_service_category ON service(category_id);

-- ======================================================
-- Service_Provider
-- ======================================================
CREATE TABLE IF NOT EXISTS service_provider (
    service_provider_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    skill VARCHAR(750),
    license_number VARCHAR(80),
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    is_available BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    experience VARCHAR(80),
    profile_image VARCHAR(250),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_sp_user
    FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_sp_user_id ON service_provider(user_id);

-- ======================================================
-- Many-to-many: service_provider_service
-- ======================================================
CREATE TABLE IF NOT EXISTS service_provider_service (
    service_id BIGINT NOT NULL,
    service_provider_id BIGINT NOT NULL,
    PRIMARY KEY (service_id, service_provider_id),
    CONSTRAINT fk_sps_service FOREIGN KEY (service_id)
    REFERENCES service(service_id) ON DELETE CASCADE,
    CONSTRAINT fk_sps_provider FOREIGN KEY (service_provider_id)
    REFERENCES service_provider(service_provider_id) ON DELETE CASCADE
    );

-- ======================================================
-- Address
-- ======================================================
CREATE TABLE IF NOT EXISTS address (
    address_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address VARCHAR(750),
    city VARCHAR(150),
    longitude DECIMAL(10,7),
    latitude DECIMAL(10,7),
    CONSTRAINT fk_address_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_address_user_id ON address(user_id);

-- ======================================================
-- Booking
-- ======================================================
CREATE TABLE IF NOT EXISTS booking (
    booking_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    service_provider_id BIGINT,
    service_id BIGINT,
    total_price DECIMAL(12,2),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status VARCHAR(80) DEFAULT 'PENDING',
    address_id BIGINT,
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_booking_provider FOREIGN KEY (service_provider_id)
    REFERENCES service_provider(service_provider_id) ON DELETE SET NULL,
    CONSTRAINT fk_booking_service FOREIGN KEY (service_id)
    REFERENCES service(service_id) ON DELETE SET NULL,
    CONSTRAINT fk_booking_address FOREIGN KEY (address_id)
    REFERENCES address(address_id) ON DELETE SET NULL
    );

CREATE INDEX IF NOT EXISTS idx_booking_user_id ON booking(user_id);
CREATE INDEX IF NOT EXISTS idx_booking_provider_id ON booking(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_booking_service_id ON booking(service_id);

-- ======================================================
-- Payment
-- ======================================================
CREATE TABLE IF NOT EXISTS payment (
    payment_id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(80),
    transaction_ref VARCHAR(200),
    status VARCHAR(80) DEFAULT 'PENDING',
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_payment_booking FOREIGN KEY (booking_id)
    REFERENCES booking(booking_id) ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_payment_booking_id ON payment(booking_id);

-- ======================================================
-- Review
-- ======================================================
CREATE TABLE IF NOT EXISTS review (
    review_id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT,
    service_provider_id BIGINT,
    user_id BIGINT,
    rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
    comment VARCHAR(750),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_review_booking FOREIGN KEY (booking_id)
    REFERENCES booking(booking_id) ON DELETE SET NULL,
    CONSTRAINT fk_review_provider FOREIGN KEY (service_provider_id)
    REFERENCES service_provider(service_provider_id) ON DELETE SET NULL,
    CONSTRAINT fk_review_user FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE SET NULL
    );

CREATE INDEX IF NOT EXISTS idx_review_provider_id ON review(service_provider_id);
CREATE INDEX IF NOT EXISTS idx_review_user_id ON review(user_id);

-- ======================================================
-- Notification
-- ======================================================
CREATE TABLE IF NOT EXISTS notification (
    notification_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(100),
    message VARCHAR(1000),
    seen BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_notification_user
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_notification_user_id ON notification(user_id);
